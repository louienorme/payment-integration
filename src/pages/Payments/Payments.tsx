import { 
    Container
    ,makeStyles
    ,createStyles
    ,Theme 
} from "@material-ui/core"
import { TopNav } from "components"
import PaymentSection from "./PaymentSection/PaymentSection"

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        page: {
            padding: theme.spacing(2),
            marginLeft: '25px',
            marginRight: '25px',
        },
        toolbar: theme.mixins.toolbar
    })
)

const Payments = () => {
    const classes = useStyles()


    return (
        <div>
            <TopNav />
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                    <PaymentSection />
            </div>
        </div>
    )
}

export default Payments