import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";

const Header = () => {

  return (
    <AppBar sx={{ bgcolor: "rgb(62, 197, 0)", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
            <>
              <NavigationLink
                bg="white"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="white"
                textColor="black"
                to="/signup"
                text="Signup"
              />
            </>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
