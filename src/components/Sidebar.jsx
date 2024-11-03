import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Bookmark,
  Camera,
  CircleFadingPlus,
  HomeIcon,
  LogOut,
  PanelRightOpen,
  Search,
  User2,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/auth/authSlice";
import { toast } from "sonner";

const Sidebar = (props) => {
  const links = [
    {
      path: "/",
      name: "Home Page",
      icon: HomeIcon,
    },
    {
      path: "/search",
      name: "Search Profile",
      icon: Search,
    },
    {
      path: "/posts/create",
      name: "Make a Post",
      icon: Camera,
    },
    {
      path: "/stories/create",
      name: "Make a Stories",
      icon: CircleFadingPlus,
    },
    {
      path: "/saved",
      name: "Your Save Post",
      icon: Bookmark,
    },
    {
      path: `/${props.data}`,
      name: "My Profile",
      icon: User2,
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await axiosInstance.get("/auth/logout");
    },
    onSuccess: () => {
      toast.success("Logout Success");
      navigate("/login");

      dispatch(logoutUser());
    },
  });

  const handleLogout = async (e) => {
    mutation.mutate();
  };

  const SidebarContent = ({ data }) => (
    <div className="fixed bottom-0 right-0 top-0 flex w-[270px] flex-col gap-1 overflow-scroll border-l-2 border-border bg-white p-4">
      <SheetHeader>
        <SheetTitle className="flex flex-col text-start text-sm">
          Hello 👋
          <span>@{data}</span>
        </SheetTitle>
      </SheetHeader>
      <DropdownMenuSeparator />
      <div className="mt-2 flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative flex cursor-pointer select-none items-center gap-2 rounded-base border-2 border-secondaryBlack px-2 py-1.5 text-sm font-base outline-none transition-colors focus:border-border data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:border-darkBorder ${
                  isActive ? "bg-main shadow-light" : "bg-white"
                }`
              }
            >
              <link.icon className="size-4" />
              {link.name}
            </NavLink>
          ))}
        </div>
        <div
          onClick={handleLogout}
          className="relative flex cursor-pointer select-none items-center gap-2 rounded-base border-2 border-secondaryBlack bg-destrucive px-2 py-1.5 text-sm font-base outline-none transition-colors focus:border-border data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:border-darkBorder"
        >
          <LogOut className="size-4" />
          Logout
        </div>
      </div>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <PanelRightOpen className="cursor-pointer" />
      </SheetTrigger>
      {window.innerWidth > 1080 ? (
        <SidebarContent data={props.data} />
      ) : (
        <SheetContent className="flex w-[230px] flex-col gap-1 lg:w-[350px]">
          <SidebarContent data={props.data} />
        </SheetContent>
      )}
    </Sheet>
  );
};

export default Sidebar;
