import type { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Login from "@mui/icons-material/Login";
import Link from "next/link";

const LoginAndRegister: FunctionComponent<{}> = () => {
    return (
        <Box sx={{ ml: 2 }}>
            <Button variant="contained" sx={{ px: 3, mx: 1 }} tabIndex={-1}>
                <Login sx={{ mr: 1 }}></Login>
                <span>Login</span>
            </Button>

            <Link href="/register">
                <a tabIndex={-1}>
                    <Button variant="outlined" sx={{ px: 3, mx: 1 }} tabIndex={-1}>
                        Register
                    </Button>
                </a>
            </Link>
        </Box>
    );
};

export default LoginAndRegister;
