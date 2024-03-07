import mobileMenuItems from "@/data/mobileMenuItems";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const ProSidebarContent = () => {
  const path = usePathname();

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {mobileMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            href={item.link}
            component={<Link to={item.link} />}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
