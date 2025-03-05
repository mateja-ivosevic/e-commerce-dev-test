"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/store/actions/authActions";
import { AppDispatch, RootState } from "@/store";

const TopNavBar: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { selectedProduct } = useSelector((state: RootState) => state.products);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  const generateBreadcrumbs = () => {
    if (!pathname) return [];

    const segments = pathname
      .split("/")
      .filter((segment) => segment !== "" && segment !== "admin");

    const breadcrumbs = segments.map((segment, index) => {
      let path = "";
      const pathSegments = pathname.split("/").filter((seg) => seg !== "");
      for (let i = 0; i <= pathSegments.indexOf(segment); i++) {
        path += `/${pathSegments[i]}`;
      }

      let title = segment.charAt(0).toUpperCase() + segment.slice(1);

      if (
        index > 0 &&
        segments[index - 1] === "products" &&
        !isNaN(Number(segment))
      ) {
        title = selectedProduct?.title || `Product ${segment}`;

        if (title.length > 30) {
          title = title.substring(0, 30) + "...";
        }
      }

      return { path, title };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center space-x-2">
        {breadcrumbs.length > 0 ? (
          <>
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path}>
                <span className="text-gray-400 mx-2">&gt;</span>
                <Link
                  href={crumb.path}
                  className={`${
                    index === breadcrumbs.length - 1
                      ? "text-gray-800 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {crumb.title}
                </Link>
              </React.Fragment>
            ))}
          </>
        ) : (
          <Link href="/" className="text-gray-800 font-medium">
            Home
          </Link>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition"
      >
        Logout
      </button>
    </div>
  );
};

export default TopNavBar;
