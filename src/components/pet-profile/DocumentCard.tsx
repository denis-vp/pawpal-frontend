import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

interface DocumentCardProps {
  title: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{
      border: '1px solid #dce5dc',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 6,
      },
    }}>
      <CardContent>
        <Avatar
          sx={{
            bgcolor: 'transparent',
            width: '100%',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormatAlignLeftIcon fontSize="large" color="action" sx={{ height: '120px', width: '100%', padding: 2 }} />
        </Avatar>
        <Typography variant="h6" sx={{ pt: 1, fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">Description of the document.</Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default DocumentCard;
