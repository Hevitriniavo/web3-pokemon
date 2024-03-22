import { FormControlLabel, Grid, Switch } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface HeaderProps{
 isDark: boolean;
 onToggleTheme: () => void;
}

export default function Header({onToggleTheme, isDark}: HeaderProps) {
 const pathname = usePathname();
 const router = useRouter();

 return (
    <Grid sx={{p: 2}}>
      <Grid
        container
        direction="row"
        justifyContent={pathname == "/" ? "center" : "space-between"}
        alignItems="center"
      >
        <Grid item lg={6}>
          <Logo/>
        </Grid>
        <Grid
          item
          xs={6}
          rowSpacing={1}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Switch onChange={onToggleTheme} name="gilan" color="primary" />
            }
            label={
              isDark ? <DarkModeIcon/> : <LightModeIcon/>
            }
          />
        </Grid>
      </Grid>
    </Grid>
 );
}
