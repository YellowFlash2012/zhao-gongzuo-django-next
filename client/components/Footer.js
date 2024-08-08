import Link from "next/link";


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-1">
            <p className="text-center mt-1">
                Jobbee - {currentYear} - All Rights Reserved
                
            </p>
        </footer>
    );
};
export default Footer;
