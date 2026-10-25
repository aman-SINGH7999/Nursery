import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginUI from "./LoginUI";
import RegisterUI from "./RegisterUI";

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="md:max-w-lg w-full flex justify-center min-h-[100vh] py-5 overflow-y-auto no-scrollbar">
        <div className="mx-auto max-w-sm sm:p-0 px-5">
          <div className="h-32 w-auto">
            <img
              src="/name-logo.png"
              alt="logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="space-y-2 py-5">
            <div className="text-4xl font-extrabold">Grow your world</div>
            <div className="text-green-700">
              Enter your mobile number to access your green space.
            </div>
          </div>
          <Tabs defaultValue="login" className="">
            <TabsList className="border-b-2 w-full justify-start py-6 bg-white">
              <TabsTrigger
                value="login"
                className="
                px-6 py-4 !shadow-none
                data-[state=active]:!shadow-none
                border-b-[3px] border-transparent
                data-[state=active]:border-green-500
                data-[state=active]:text-green-600
                hover:bg-gray-50
                data-[state=active]:hover:bg-gray-50
              "
              >
                Login
              </TabsTrigger>

              <TabsTrigger
                value="register"
                className="
                px-6 py-4 !shadow-none
                data-[state=active]:!shadow-none
                border-b-[3px] border-transparent
                data-[state=active]:border-green-500
                data-[state=active]:text-green-600
                hover:bg-gray-50
                data-[state=active]:hover:bg-gray-50
              "
              >
                Signup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="pt-6">
              {/*  login form */}
              <LoginUI />
            </TabsContent>

            {/*  Register form */}
            <TabsContent value="register" className="pt-6">
              <RegisterUI />
            </TabsContent>
          </Tabs>
          <div className="pb-10 pt-5">
            By continuing, you agree to our{" "}
            <span className="text-green-500 hover:text-green-600 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-green-500 hover:text-green-600 cursor-pointer">
              Privacy Policy
            </span>
            .
          </div>
        </div>
      </div>
      <div className="hidden md:block flex-1 overflow-y-auto no-scrollbar w-full h-[100vh] bg-green-200">
        <img
          src="house-plant.jpg"
          alt=""
          className="object-cover min-h-screen"
        />
        {/* <img src="cactus.jpg" alt="" className="object-cover min-h-screen" /> */}
      </div>
    </div>
  );
}
