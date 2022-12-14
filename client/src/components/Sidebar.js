import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Text,
    Link
} from '@chakra-ui/react';

const styles = {
    float: "right"
}

function SideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button ref={btnRef} bg='orange.300' onClick={onOpen} style={styles}>
                Open Menu
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Account</DrawerHeader>
                    <DrawerBody>
                        <Text><Link href='/Profile'> Go To Profile Page</Link></Text>
                        <br />
                        <Text><Link href='/profileUpdate'>Edit Profile</Link></Text>
                        <br />
                        <Text><Link href='/friends'> Discover New Friends!</Link></Text>
                        <br />
                        <Text><Link href='/donate'> Support Us!</Link></Text>
                        <br />
                        <Text><Link href='/SignUp'> Sign Up</Link></Text>
                        <br />
                        <Text><Link href='/Home'> Log Out</Link></Text>
                    </DrawerBody>

                    <DrawerFooter>
                        <Text>Bee My Friend<sup>&#169;</sup></Text>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideBar;