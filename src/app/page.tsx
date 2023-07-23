
import { Container, Stack, AppBar, Toolbar, Typography, Card, CardHeader, CardContent, CardActions } from '@mui/material'
import styles from './page.module.css'
import { CSVHold } from './components/csvHold'

export default function Home() {
  return (
    <>
      <AppBar
        position='fixed'
        color='default'
        elevation={0}
        sx={{
          color: 'var(--header-fg)',
          background: 'var(--header-bg)',
          borderBottom: '1px solid var(--header-border)'
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Breezedave -&gt; CSV column combiner 
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={styles.container} maxWidth="xl">
        <Stack direction="column" spacing={5}>
          <Card className={styles.fullWidth}>
            <CardHeader
              title="What is this?"
              titleTypographyProps={{ align: 'left' }}
            >
            </CardHeader>
            <CardContent>
              <Typography variant="body1" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                The purpose of this tool is to help you combine columns from two csv files, based on a unique identifier (like a product code)
              </Typography>
            </CardContent>
          </Card>
          <Card className={styles.fullWidth}>
            <CardHeader
              title="Is this safe?"
              titleTypographyProps={{ align: 'left' }}
            >
            </CardHeader>
            <CardContent>
              <Typography variant="body1" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                This tool does everything &quot;in the browser&quot;.
              </Typography>
              <Typography variant="body1" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                What this means that any files you add aren&apos;t sent anywhere. They stay on your computer, and nobody else can see them (unless they&apos;re looking over your shoulder).
              </Typography>
            </CardContent>
          </Card>
          <Card className={styles.fullWidth}>
            <CardHeader
              title="How does it work?"
              titleTypographyProps={{ align: 'left' }}
            >
            </CardHeader>
            <CardContent>
              <Typography variant="body1" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                To combine your csv files, simply follow the instructions below:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Below there are two boxes: &quot;Main File&quot; &quot;New Info File&quot;.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    For &quot;Main File&quot; you want to click on &quot;Add File&quot; and add the csv file you want updated.
                  </Typography>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Once it&apos;s added, you should be able to see your file.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    For &quot;New Info File&quot; you want to click on &quot;Add File&quot; and add the csv file to use to update &quot;Main File&quot;.
                  </Typography>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Once it&apos;s added, you should be able to see your file.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    The &quot;Primary Column&quot; is the column that has you unique identifier in (e.g. a product code or SKU).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    The &quot;Overwritten Column&quot; is the column that you want to replace with data from the &quot;New Info File&quot;.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    The &quot;Copied Column&quot; is the column that you want to us to replace the data in the &quot;Main File&quot;.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    If there are rows in the &quot;Main File&quot; that don&apos;t exist in the &quot;New Info File&quot; you can choose to either use the original values from the &quot;Main File&quot; or to leave the value blank.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    A preview of the final file is then shown. Any changes are shown in the changed column (with the original values crossed out).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Click &quot;Download&quot; to download your new file.
                  </Typography>
                </li>
              </ul> 
            </CardContent>
          </Card>
          <CSVHold/>
        </Stack>
      </Container>
    </>
    
  )
}
