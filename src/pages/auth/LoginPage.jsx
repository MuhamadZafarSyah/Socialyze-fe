import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUser, logoutUser, setLoading } from "@/redux/auth/authSlice";
import axiosInstance from "@/apis/axiosInstance";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (data) => axiosInstance.post("/auth/login", data),
    onSuccess: (response) => {
      const userData = response.data.data;
      dispatch(loginUser(userData));
      toast.success("Login Success");
      navigate("//");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message;

      if (errorMessage === "Cannot read properties of null (reading 'id')") {
        navigate("/register");
        dispatch(logoutUser());
        toast.error("Buat akun anda terlebih dahulu");
      } else {
        toast.error(errorMessage);
      }
    },
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    mutation.mutate(data);
  };
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="z-10" method="post">
        <Card className="z-10 w-[330px]">
          <CardHeader>
            <CardTitle>Welcome Back Zafar Ganteng👋</CardTitle>
            <CardDescription>
              Please enter your details to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4 text-start">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Type your email"
                  name="email"
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Type your password"
                  name="password"
                  autoComplete="current-password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-between gap-4">
            <Button className="w-full">Sign in</Button>
            <span>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-800">
                sign up
              </Link>
            </span>
          </CardFooter>
        </Card>
      </form>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  );
};

export default LoginPage;
