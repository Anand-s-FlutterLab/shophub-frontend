import { SiShopify } from "react-icons/si";

function AuthLeftLogo() {
  return (
    <div className="flex flex-row mb-20 font-semibold items-center">
      <SiShopify size={30} className="text-primary" />
      <h1 className="text-xl ml-2">Shop</h1>
      <h1 className="text-xl text-primary">Hub</h1>
    </div>
  );
}
export default AuthLeftLogo;
