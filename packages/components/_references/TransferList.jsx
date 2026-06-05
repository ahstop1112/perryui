import React, { useState } from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import {
  Grid,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: theme.palette.text[1],
    },
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: `38%`,
    height: `auto`,
    overflow: "auto",
    [theme.breakpoints.between("xs", "md")]: {
      width: `100%`,
    },
  },
  listItem: {
    width: `100%`,
  },
  buttonList: {
    width: `22%`,
    minWidth: 120,
    height: `auto`,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  disabled: {
    color: theme.palette.text[3],
    pointerEvents: `none !important`,
  },
}));

const not = (a, b) => a.filter((value) => b.indexOf(value) === -1);
const intersection = (a, b) => a.filter((value) => b.indexOf(value) !== -1);
const union = (a, b) => [...a, ...not(b, a)];

const TransferList = ({ inputField, pageAction }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const { rightList = [], leftList = [] } = inputField;
  const rightNumber = rightList.map((item) => item.id);
  const leftNumber = leftList.filter(({ id }) => !rightNumber.includes(Number(id))).map((item) => item.id);

  const [left, setLeft] = useState(leftNumber);
  const [right, setRight] = useState(rightNumber);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    // console.log(right.concat(leftChecked));
    inputField.updatedList = right.concat(leftChecked);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    inputField.updatedList = not(right, rightChecked);
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={`${classes.cardHeader} ${pageAction === "view" ? classes.disabled : ""}`}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={pageAction === "view" || items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List dense component="div" role="list">
        {items.length > 0 &&
          items.map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;
            const textTitle = leftList.filter((item) => item.id === value).map((item) => item.title);
            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
                className={`${classes.listItem} ${pageAction === "view" ? classes.disabled : ""}`}
              >
                <ListItemIcon>
                  <Checkbox
                    disabled={pageAction === "view"}
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${textTitle[0]}`}
                  className={pageAction === "view" ? classes.disabled : ""}
                />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" className={classes.root}>
      <Grid item className={classes.list}>
        {customList("Choices", left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0 || pageAction === "view"}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0 || pageAction === "view"}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item className={classes.list}>
        {customList("Chosen", right)}
      </Grid>
    </Grid>
  );
};

export default TransferList;

TransferList.propTypes = {
  inputField: PropTypes.shape({
    leftList: PropTypes.arrayOf(PropTypes.object).isRequired,
    rightList: PropTypes.arrayOf(PropTypes.object).isRequired,
    // updatedList: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  pageAction: PropTypes.string.isRequired,
};
