import { type IconType } from "react-icons";

interface IAuthFeatureTile {
  title: string;
  desc: string;
  icon: IconType;
}

function AuthFeatureTile({ title, desc, icon: Icon }: IAuthFeatureTile) {
  return (
    <div className="flex mb-10">
      <div className="rounded-2xl bg-primary-active/10 p-3 mr-3">
        <Icon size={25} className="text-primary" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-text-muted">{desc}</p>
      </div>
    </div>
  );
}

export default AuthFeatureTile;
