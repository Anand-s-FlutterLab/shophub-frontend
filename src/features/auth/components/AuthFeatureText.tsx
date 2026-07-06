interface IAuthFatureText {
  feature1: string;
  feature2: string;
  feature3: string;
}

function AuthFatureText({ feature1, feature2, feature3 }: IAuthFatureText) {
  return (
    <>
      <h1 className="text-6xl font-bold mb-3">{feature1}</h1>
      <h1 className="text-6xl font-bold mb-3">{feature2}</h1>
      <h1 className="text-6xl font-bold mb-8 text-primary">{feature3}</h1>
    </>
  );
}

export default AuthFatureText;
