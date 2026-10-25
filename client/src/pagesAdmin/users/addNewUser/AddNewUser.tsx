import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GlobalSelect from "@/components/GlobalSelect";
import { Save } from "lucide-react";
import { useState } from "react";
import SingleImageUpload from "@/components/admin/components/SingleImageUpload";

export default function AddNewUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profile_image:'',
    role: "user",
    status: "active",
  });

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Manager", value: "manager" },
  ];

  const statuses = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Blocked", value: "blocked" },
  ];

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Users", href: "/admin/users" },
          { label: "Add New" },
        ]}
      />

      <div className="p-6 space-y-4">
        {/* Sticky Header */}
        <div className="flex justify-between items-center gap-3 sticky top-0 z-10 py-2">
          <div>
            <div className="text-2xl font-bold">Add New User</div>
            <div className="text-gray-600">
              Create and manage user accounts.
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="destructive">
              Cancel
            </Button>
            <Button className="bg-green-500 hover:bg-green-600">
              <Save /> Add
            </Button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-12 gap-5">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
            <Card className="p-5 space-y-4">
              <div className="text-xl font-semibold">
                General Information
              </div>

              <div className="space-y-1">
                <div>Full Name</div>
                <Input
                  placeholder="e.g. Aman Singh"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <div>Email</div>
                <Input
                  type="email"
                  placeholder="e.g. aman@gmail.com"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <div>Phone</div>
                <Input
                  placeholder="e.g. 9876543210"
                  value={user.phone}
                  onChange={(e) =>
                    setUser({ ...user, phone: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div>User Role</div>
                  <GlobalSelect
                    value={user.role}
                    onChange={(val) =>
                      setUser({ ...user, role: val })
                    }
                    options={roles}
                    className="!w-full"
                  />
                </div>

                <div className="space-y-1">
                  <div>Status</div>
                  <GlobalSelect
                    value={user.status}
                    onChange={(val) =>
                      setUser({ ...user, status: val })
                    }
                    options={statuses}
                    className="!w-full"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
            <Card className="p-5 space-y-4">
              <div className="text-xl font-semibold">Profile Pic</div>
              <SingleImageUpload
                onChange={(file) =>
                  setUser({ ...user, profile_image: file })
                }
              />

            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
