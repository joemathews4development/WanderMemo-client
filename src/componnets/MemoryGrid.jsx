import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

function MemoryGrid({ memories }) {
  return (
    <Grid container spacing={3}>
        {memories.map((memory) => {
            return(
                <Grid size={{xs: 12, sm: 6, md: 4}} key={memory._id}>
                    <Card sx={{borderRadius: 3}}>
                        {memory.medias?.[0] && (
                            <img src={memory.medias[0]} style={{width: "100%", height: "160px", objectFit: "cover"}}/>
                        )}
                        <CardContent>
                            <Typography variant='h6'>{memory.title}</Typography>
                            <Typography variant='body2' color="text.secondary">{memory.caption}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })}
    </Grid>
  )
}

export default MemoryGrid