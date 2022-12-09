import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Radio,
    Button,
    RadioGroup,
    useDisclosure
  } from '@chakra-ui/react'


function PlacementExample() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('right')
  
    return (
      <>
        {/* <RadioGroup defaultValue={placement} onChange={setPlacement}> */}
          {/* <Stack direction='row' mb='4'>
            <Radio value='top'>Top</Radio>
            <Radio value='right'>Right</Radio>
            <Radio value='bottom'>Bottom</Radio>
            <Radio value='left'>Left</Radio>
          </Stack> */}
        {/* </RadioGroup> */}
        <Button colorScheme='blue' onClick={onOpen}>
          Menu
        </Button>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>My Profile</DrawerHeader>
            <DrawerBody>
              <p>Edit Profile</p>
              <p>Donate</p>
              <p>Logout</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default PlacementExample;