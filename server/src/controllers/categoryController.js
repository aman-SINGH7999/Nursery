import cloudinary from "../config/cloudinary.js";
import { Categories } from "../models/index.js";
import { Op } from "sequelize";

// CREATE CATEGORY
const createCategory = async (req, res) => {
  // console.log("BODY:", req.body);
  // console.log("FILE:", req.file);
  try {
    const { name, slug, parent_id, status } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required",
      });
    }

    const existing = await Categories.findOne({ where: { slug } });
    if (existing) {
      return res.status(403).json({
        success: false,
        message: "Category with this slug already exists",
      });
    }

    const imageUrl = req.file ? req.file.path : null;
    const public_id = req.file ? req.file.filename : null;

    const category = await Categories.create({
      name,
      slug,
      parent_id: parent_id && Number(parent_id) > 0 ? parent_id : null,
      image: imageUrl,
      image_public_id: public_id,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("createCategory error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// GET ALL ACTIVE CATEGORIES
const getActiveCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      include:[
        {
          model: Categories,
          as: 'parent',
          attributes: ["id", "name"],
        }
      ],
      where: {
        status: "active",
      },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("getActiveCategories error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
  try {
    const { status, search } = req.query;

    // pagination params
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (status && status !== "all") {
      whereClause.status = status;
    }

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { slug: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { rows: categories, count: total } =
      await Categories.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Categories,
            as: "parent",
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

    res.json({
      success: true,
      data: categories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("getAllCategories error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// GET SINGLE CATEGORY BY ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category id",
      });
    }

    const category = await Categories.findByPk(id);

    if (!category || category.status === "deleted") {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("getCategoryById error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, parent_id, image, status } = req.body;

    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // slug duplicate check (except self)
    if (slug) {
      const existing = await Categories.findOne({
        where: {
          slug,
          id: { [Op.ne]: id },
        },
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Slug already in use",
        });
      }
    }

    let imageUrl = category.image;
    let imagePublicId = category.image_public_id;

    if (req.file) {
      // new image
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId);
      }
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    }
    else if (image === "") {
      // remove image
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId);
      }
      imageUrl = null;
      imagePublicId = null;
    }
    else if (image) {
      // keep old image
      imageUrl = image;
    }


    await category.update({
      name: name ?? category.name,
      slug: slug ?? category.slug,
      parent_id: parent_id === "none" ? null : parent_id ?? category.parent_id,
      image: imageUrl,
      image_public_id: imagePublicId,
      status: status ?? category.status,
    });


    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("updateCategory error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // image delete (cloudinary)
    if (category.image_public_id) {
      await cloudinary.uploader.destroy(category.image_public_id);
    }

    await category.destroy(); // hard delete

    res.json({
      success: true,
      message: "Category deleted permanently",
    });
  } catch (error) {
    console.error("deleteCategory error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// BULK DELETE CATEGORIES (SOFT DELETE)
const bulkInactiveCategories = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Category ids array is required",
      });
    }

    const result = await Categories.update(
      { status: "inactive" },
      {
        where: {
          id: ids,
          status: { [Op.ne]: "deleted" },
        },
      }
    );

    res.json({
      success: true,
      message: "Categories inactive successfully",
      affectedRows: result[0],
    });
  } catch (error) {
    console.error("bulkInactiveCategories error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  bulkInactiveCategories,
  getActiveCategories,
}