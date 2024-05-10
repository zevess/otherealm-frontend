import { Box } from "@mui/material"
import { FranchiseCard } from "../Cards/ProfileCard"

export const FranchiseList = () =>{
    return(
        <Box display={"flex"} flexWrap={"wrap"} width={'1300px'}>
            <FranchiseCard title={"Marvel"} image={"src/assets/img/5d8326726990392fe3d42652404eacfa.png"} />
            <FranchiseCard title="Wizarding World" image="src/assets/img/Wizarding_World_logo.svg.png" />
            <FranchiseCard title="Wizarding World" image="src/assets/img/Wizarding_World_logo.svg.png" />
            <FranchiseCard title="Wizarding World" image="src/assets/img/Wizarding_World_logo.svg.png" />
            <FranchiseCard title="Wizarding World" image="src/assets/img/Wizarding_World_logo.svg.png" />
        </Box>
    )
}