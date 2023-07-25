import { useNavigate } from 'react-router-dom'
import {
    AppBar
    ,Box
    ,Toolbar
    ,Typography
    ,IconButton
} from '@material-ui/core'
import {
    mdiCreditCardOutline as Card
} from '@mdi/js'
import {
    Icon
} from '@mdi/react'

const TopNav = () => {
    const navigate = useNavigate()

    return (
        <Box position='static'>
            <AppBar>
                <Toolbar>
                    <IconButton>
                        <Icon path={Card} size={1.5} style={{ color: 'white' }}/>
                    </IconButton>
                    <Typography variant='h5' onClick={() => navigate('/')}>
                        Payment Integration
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopNav