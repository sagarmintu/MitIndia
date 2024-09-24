import { LOGO } from "@/utils/image-constants";
import Image from "next/image";
import Link from "next/link";
import "ultimate-react-multilevel-menu/dist/esm/index.css";
import { Navbar, Collapse, Item } from "ultimate-react-multilevel-menu";
import client from "../../client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import HeaderButton from "./HeaderButton";

const SubNavbar = ({ headerData }: { headerData?: any }) => {
  const [menuData, setMenuData] = useState<string[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query registerMenu {
              globalPages {
                edges {
                  node {
                    registerMenu {
                      menu
                    }
                  }
                }
              }
            }
          `,
        });

        if (data && data.globalPages && data.globalPages.edges) {
          const menus = data.globalPages.edges
            .map((edge: any) => edge.node.registerMenu.menu)
            .filter((menu: any): menu is string => menu !== null); // Filter out null values
          setMenuData(menus);
        }
      } catch (error) {
        console.error("Error fetching PlacementUnit data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const renderMenuItems = () => {
    return menuData.flatMap((menu, index) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(menu, "text/html");
      const links = Array.from(doc.querySelectorAll("a"));

      return links.map((link, linkIndex) => {
        const href = link.getAttribute("href") || "#"; // Provide a default value if href is null

        return (
          <Item as="strong" key={`${index}-${linkIndex}`}>
            <Link href={href}>{link.textContent}</Link>
          </Item>
        );
      });
    });
  };

  return (
    <Navbar className="mb-60">
      <Link href="/" className="logo-nav">
        <Image
          src={LOGO}
          alt="logo"
          height={500}
          width={500}
          className="pointer"
        />
      </Link>
      <Collapse>{renderMenuItems()}</Collapse>
      <HeaderButton buttonData={headerData} />
    </Navbar>
  );
};

export default SubNavbar;
