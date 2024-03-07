import { blogItems, propertyItems, pageItems } from '@/data/navItems';
import { showSignupModal } from '@/slices/userSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState('');
  const [submenu, setSubmenu] = useState('');

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    blogItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) {
        setTopMenu('blog');
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) {
        setTopMenu('pages');
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split('/')[1] == pathname.split('/')[1]) {
          setTopMenu('property');
          setSubmenu(item.label);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split('/')[1] == pathname.split('/')[1]) {
      return 'menuActive';
    }
  };

  const isShowSignupModal = () => {
    dispatch(showSignupModal());
  };

  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <Link className="list-item" href="/">
          <span className={topMenu == 'home' ? 'title menuActive' : 'title'}>
            Home
          </span>
        </Link>
      </li>

      <li className="megamenu_style dropitem">
        <Link className="list-item" href="/vergelijk-zwembad">
          <span className={topMenu == 'listing' ? 'title menuActive' : 'title'}>
            vergelijk-zwembad
          </span>
        </Link>
      </li>
      {/* End listings */}

      <li className="visible_list dropitem">
        <Link className="list-item" href="/blogs">
          <span className={topMenu == 'blog' ? 'title menuActive' : 'title'}>
            Blogs
          </span>
        </Link>
      </li>
      {/* End blog Items */}

      <li className="visible_list dropitem">
        <a className="list-item" style={{ cursor: 'pointer' }}>
          <span className={topMenu == 'pages' ? 'title menuActive' : 'title'}>
            Overige
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {pageItems.map((item, index) => (
            <li key={index}>
              {item.label === 'Compare' ? (
                token ? (
                  <Link
                    className={`${handleActive(item.href)}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    onClick={isShowSignupModal}
                    className={`${handleActive(item.href)} compare-link`}
                  >
                    {item.label}
                  </span>
                )
              ) : (
                <Link className={`${handleActive(item.href)}`} href={item.href}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </li>
      {/* End pages Items */}
    </ul>
  );
};

export default MainMenu;
