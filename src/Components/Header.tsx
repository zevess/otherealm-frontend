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
background: '-webkit - linear - gradient(90deg, #b6f7f4,#81c290)';/* Chrome 10-25, Safari 5.1-6 */                          
background: 'linear - gradient(90deg, #b6f7f4,#81c290);'/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */                                             