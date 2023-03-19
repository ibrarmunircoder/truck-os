import { Box, Grid, GridProps, Typography } from "@mui/material";
import { useVerificationStyles } from "layouts/dashboard/partials/verification/verification.styles";
import Link from "next/link";
import { FunctionComponent } from "react";

export interface NavigationInterface extends GridProps { }

export const VerificationTopbar: FunctionComponent<NavigationInterface> = () => {
    const classes = useVerificationStyles();

    return (
        <Box component={'div'}>
            <Grid container>
                <Grid item xs={12} className={classes.verificationHeader}>
                    <Typography>To use truckOS pay, you must <Link href={'#'}><a>complete an initial ID verification.</a></Link></Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
