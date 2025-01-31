import RegisterForm from "../../components/forms/RegisterForm";
import Header from "../../components/organisms/Header";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <RegisterForm/>
        </div>
      </div>
    </div>
    
  );
};

export default LoginPage;