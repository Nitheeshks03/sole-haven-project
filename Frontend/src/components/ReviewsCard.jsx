import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    rem,
    Rating,
  } from '@mantine/core';
  
  const useStyles = createStyles((theme) => ({
    comment: {
      padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
      height:'200px',
      width:'300px',
      marginTop:'50px'
    },
  
    body: {
      paddingLeft: rem(54),
      paddingTop: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
    },
  }));
  

  
  export function ReviewsCard({ user, time, rating,comments }) {
    const { classes } = useStyles();
    return (
      <Paper withBorder radius="md"  className={classes.comment}>
        <Group>
          <Avatar  alt={user} radius="xl" />
          <div>
            <Text fz="sm">{user}</Text>
            <Rating value={rating} />
            <Text fz="xs" c="dimmed">
              {time}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div>{comments}</div>
        </TypographyStylesProvider>
      </Paper>
    );
  }

  export default ReviewsCard;