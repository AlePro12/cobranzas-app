import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import BookIcon from "@mui/icons-material/Book";
import SchoolIcon from "@mui/icons-material/School";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

import FileOpenIcon from "@mui/icons-material/FileOpen";
const item = {
  py: "2px",
  px: 3,
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(0,0,0,0.1) inset",
  py: 1.5,
  px: 3,
  fontSize: "0.45rem",
};

type itemNav = {
  id: string;
  icon: React.ReactNode;
  active?: boolean;
  path: string;
};
type categoryNav = {
  id: string;
  children: itemNav[];
};

export default function Navigator(props: any) {
  const { ...other } = props;

  const [categories, setCategories] = React.useState<categoryNav[]>([
    {
      id: "General",
      children: [
        {
          id: "Home",
          icon: <HomeIcon />,
          path: "/",
        },
      ],
    },
    {
      id: "Estudiantes",
      children: [
        {
          id: "Estudiantes",
          icon: <PeopleIcon />,
          path: "/Students",
        },
        {
          id: "Inscribir",
          icon: <AppRegistrationIcon />,
          path: "/Enrollments",
        },
      ],
    },
    {
      id: "Institucion",
      children: [
        {
          id: "Programas",
          icon: <BookIcon />,
          path: "/Programs",
        },
        {
          id: "Cursos y materias",
          icon: <SchoolIcon />,
          path: "/Courses",
        },
      ],
    },
    {
      id: "Reportes",
      children: [
        {
          id: "Inscripciones",
          icon: <FileOpenIcon />,
          path: "/Reports/Enrollments",
        },
        {
          id: "Estudiantes",
          icon: <FileOpenIcon />,
          path: "/Reports/Students",
        },
        {
          id: "Cursos",
          icon: <FileOpenIcon />,
          path: "/Reports/Courses",
        },
        {
          id: "Programas",
          icon: <FileOpenIcon />,
          path: "/Reports/Programs",
        },
        {
          id: "Pagos",
          icon: <FileOpenIcon />,
          path: "/Reports/Payments",
        },
      ],
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const newCategories = categories.map((category) => {
      const newChildren = category.children.map((child) => {
        return {
          ...child,
          active: child.path === location.pathname,
        };
      });
      return {
        ...category,
        children: newChildren,
      };
    });
    setCategories(newCategories);
  }, [location.pathname]);
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, height: 65 }}>
          {" "}
          <RequestQuoteIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              fontSize: "1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Cobranzas
          </Typography>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText>{id}</ListItemText>
            </ListItem>
            {children?.map(({ id: childId, icon, active, path }) => (
              <ListItem
                onClick={() => {
                  navigate(path);
                }}
                disablePadding
                key={childId}
              >
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
