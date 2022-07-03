import { Snackbar, SnackbarContent } from "@material-ui/core";


export const Notification = ({open, handle, message}) => {
    return (
        <div>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handle}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <SnackbarContent
                style={{ backgroundColor: "green" }}
                message={
                    <p className="text-base flex justify-between items-center gap-2">
                        {message}
                    </p>
                }
            />
        </Snackbar>
    </div>
    )
}
