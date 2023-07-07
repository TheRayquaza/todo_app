import { Grid, Text, Container } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Container mt="auto">
            <Grid justifyContent="center">
                <Text variant="body2" color="gray.500" align="center">
                    © 2023 - created by Mateo LELONG - All rights reserved
                </Text>
            </Grid>
        </Container>
    );
};

export default Footer;