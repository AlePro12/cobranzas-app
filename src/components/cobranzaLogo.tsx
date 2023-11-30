import { Typography } from "@mui/material";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
const Lg = () => {
  return (
    <>
      <RequestQuoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Cobranzas
      </Typography>{" "}
    </>
  );
};
export default Lg;
