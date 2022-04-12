import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Flex,
    Text,
    Input,
    HStack,
    Button,
    Table,
    Tbody,
    Tr,
    Th,
    Td,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent
} from "@chakra-ui/react";
import { AccountContext } from '../../contexts';
import { FaEthereum } from 'react-icons/fa';

type PastTransactionModalProps = {
    txn: any;
    isOpen: any;
    onOpen: any;
    onClose: any;
}


const PastTransactionModal = ({txn, isOpen, onOpen, onClose}: PastTransactionModalProps) => {
    return (
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered

        >
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent
                textAlign="center"
                border="1px solid black"
            >
                <ModalBody>
                    <Box>
                        <Table>
                            <Tr>
                                <Td>Nonce</Td>
                                <Td>{txn.nonce}</Td>
                            </Tr>
                        </Table>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>              
    )
}

export default PastTransactionModal;