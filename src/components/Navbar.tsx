import { LOGO } from "@/utils/image-constants";
import Image from "next/image";
import Link from "next/link";
import "ultimate-react-multilevel-menu/dist/esm/index.css";
import { Navbar, Collapse, Item, Items } from "ultimate-react-multilevel-menu";
import HeaderButton from "./HeaderButton";

const MITNavbar = ({ headerData }: { headerData?: any }) => {
  return (
    <Navbar>
      <Link href="/" className="logo-nav">
        <Image
          src={LOGO}
          alt="logo"
          height={500}
          width={500}
          className="pointer"
        />
      </Link>
      <Collapse>
        <Item as={"strong"}>
          <Link href="/">Home</Link>
        </Item>
        <Item as={"strong"}>
          <Link href="/about-us">About</Link>
        </Item>
        <Items title="Campuses" as={"div"}>
          <Item as={"strong"}>
            <Link href="/units/mit-id-loni">MIT ID Pune</Link>
          </Item>
          <Item as={"strong"}>
            <Link href="/units/avantika-university">MIT ID Indore</Link>
          </Item>
          <Item as={"strong"}>
            <Link href="/units/mit-aoe-school-of-design">MIT ID Alandi</Link>
          </Item>
          <Item as={"strong"}>
            <Link href="/units/mit-university-shillong">MIT ID Shillong</Link>
          </Item>
        </Items>
        <Item as={"strong"}>
          <Link href="/news-events">News</Link>
        </Item>
        <Item as={"strong"}>
          <Link href="/blogs">Blogs</Link>
        </Item>
      </Collapse>
      <HeaderButton buttonData={headerData} />
    </Navbar>
  );
};

export default MITNavbar;
