import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#080b0f",
        color: "#fff",
        mt: 8,
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ py: 6 }}>
          {/* Logo / About */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#e50914",
                mb: 2,
              }}
            >
              MOVIEHUB
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#9ca3af",
                maxWidth: 400,
                lineHeight: 1.8,
              }}
            >
              Discover the latest movies, explore popular titles, and find
              something great to watch.
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            {/* <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Explore
            </Typography> */}

            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/movies">Movies</FooterLink>
            <FooterLink href="/popular">Popular</FooterLink>
            <FooterLink href="/genres">Genres</FooterLink>
          </Grid>

          {/* Company */}
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            {/* <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Company
            </Typography> */}

            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </Grid>

          {/* Social */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            {/* <Typography variant="subtitle1" fontWeight={700} mb={2}>
              Follow Us
            </Typography> */}

            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
            <FooterLink href="#">YouTube</FooterLink>
            <FooterLink href="#">X / Twitter</FooterLink>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="body2" color="#6b7280">
            © {new Date().getFullYear()} MovieHub. All rights reserved.
          </Typography>

          <Typography variant="body2" color="#6b7280">
            Made with ❤️ for movie lovers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        display: "block",
        color: "#9ca3af",
        mb: 1.2,
        fontSize: "0.9rem",
        transition: "color 0.2s ease",
        "&:hover": {
          color: "#e50914",
        },
      }}
    >
      {children}
    </Link>
  );
}
