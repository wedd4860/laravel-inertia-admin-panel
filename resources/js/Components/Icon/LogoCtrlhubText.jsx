import logoImg from "../../assets/logo-ctrlhub-text.png";

const LogoCtrlhubText = (props) => {
    return (
        <img
            src={logoImg}
            className="max-w-full h-12 object-cover mt-1"
            {...props}
        />
    );
};
export default LogoCtrlhubText;
