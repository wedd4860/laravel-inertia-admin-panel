import logoImg from "../../assets/logo-ctrlhub.png";

const LogoCtrlhub = (props) => {
    return (
        <img
            src={logoImg}
            className="max-w-full h-12 object-cover"
            {...props}
        />
    );
};
export default LogoCtrlhub;
