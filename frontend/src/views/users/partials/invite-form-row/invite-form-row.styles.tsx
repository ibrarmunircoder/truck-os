import { Theme } from "@mui/material/styles";
import { darkThemeConfig } from "configuration/theme/roqone/dark";
import { lightThemeConfig } from "configuration/theme/roqone/light";
import { roqMakeStyles } from "modules/common/utils/roq-make-styles";

export const useInviteFormRowStyles = roqMakeStyles((theme:Theme)=>({
    trashIcon:{
      paddingLeft: 0,
      color: theme.palette.mode === 'light' ? lightThemeConfig.palette.error.dark : darkThemeConfig.palette.error.dark,
    }
  }))
