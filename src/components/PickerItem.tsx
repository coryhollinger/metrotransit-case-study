import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const PickerItem = (props: { handleClick: () => void; buttonText: string }) => {
  const { handleClick, buttonText } = props;
  return (
    <ListItem>
      <ListItemButton divider onClick={handleClick}>
        <ListItemText primary={buttonText} sx={{ textAlign: "center" }} />
      </ListItemButton>
    </ListItem>
  );
};

export default PickerItem;
