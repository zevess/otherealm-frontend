import { AppBar, Toolbar } from "@mui/material"
import React from "react";

interface HeaderProps {
    children: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div style={{ marginBottom: '4rem' }}>
            <AppBar style={{ background: 'white' }}>
                {/* <Toolbar sx={{
                    display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.1479), rgba(0, 0, 0, 0.04));'}}>
                    {children}
                </Toolbar> */}

                <Toolbar sx={{
                    display: 'flex', justifyContent: 'space-between'
                }}>
                    {children}
                </Toolbar>
            </AppBar>
        </div>
    )
}
                                            