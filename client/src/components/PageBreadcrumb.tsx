import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"

type Crumb = {
  label: string
  href?: string
}

export default function PageBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb>
          <BreadcrumbList>

            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <span className="font-semibold">{item.label}</span>
                  )}
                </BreadcrumbItem>

                {index !== items.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </div>
            ))}

          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
