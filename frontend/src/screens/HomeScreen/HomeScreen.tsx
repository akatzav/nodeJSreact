import { Footer } from "../../components/Footer/Footer";
import { CallToActionSection } from "../../components/HomePage/CalltoActionSection/CallToActionSection";
import { ShopSection } from "../../components/HomePage/ShopSection/ShopSection";

const HomeScreen=()=>{
    window.scrollTo(0,0);
    return(
        <div>
            <ShopSection />
            <CallToActionSection />
            <Footer />
        </div>
    )
}
export default HomeScreen