import LoginForm from "../../components/forms/LoginForm";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <LoginForm/>
        </div>
      </div>
    </div>
    
  );
};

export default LoginPage;