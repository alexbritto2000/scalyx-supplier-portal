// components/EndAllSessions.jsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import productImg from '../../../assets/img.png';
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    brand: "Famous brand",
    name: "Memories, Moments",
    description: "Magic Princess-Cut Diamond Three-Stone Engagement Ring, Size 8, 1 ct tw 10K Yellow Gold",
    sku: "R12454",
    quantity: 2,
    price: 2699.00,
    category: "Rings"
  },
  {
    id: 2,
    brand: "Luxury Watches",
    name: "Eternal Classic",
    description: "Premium Automatic Chronograph Men's Watch with Leather Strap",
    sku: "W98765",
    quantity: 1,
    price: 1899.00,
    category: "Watches"
  },
  {
    id: 3,
    brand: "Pearl Elegance",
    name: "Ocean's Treasure",
    description: "South Sea Pearl Necklace with 18K White Gold Clasp",
    sku: "N54321",
    quantity: 1,
    price: 3499.00,
    category: "Necklaces"
  },
  {
    id: 4,
    brand: "Golden Heritage",
    name: "Timeless Beauty",
    description: "Diamond Stud Earrings, 0.5 ct tw, 14K White Gold",
    sku: "E13579",
    quantity: 1,
    price: 899.00,
    category: "Earrings"
  }
];

const EndAllSessions = ({ isOpen, onClose, order }) => {
  // Calculate total quantity and price
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  const handleActionClick = (e, action) => {
    e.preventDefault();
    // Handle different actions (accept, decline, close)
    if (action === 'accept') {
      console.log('Order accepted');
    } else if (action === 'decline') {
      console.log('Order declined');
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      classNames={{
        base: "justify-center",
        wrapper: "items-center",
      }}
      hideCloseButton={true}
    >
      <ModalContent className="max-w-fit mx-auto my-8">
        {(onClose) => (
          <div>
            <div className="flex justify-between items-center px-6 py-4 bg-[#FBFFFF] shadow-sm">
              <div className="text-[1.375rem] text-[#22223B] font-medium">
                End All Sessions
              </div>

              <div className="cursor-pointer" onClick={onClose}>
                <IoMdClose size={24} />
              </div>
            </div>

            <div className="bg-[#F5F9F9] px-5 pt-6 pb-2">

              <div className="p-5">
                <div className="bg-[#FBFFFF] rounded-2xl p-6 gap-4 text-[#22223B]">
                  <div className="text-[1.375rem] font-medium">
                    Are you sure you want to end all sessions?
                  </div>

                  <div>
                    Ending all sessions will log you out of every device and you will need to sign in again.
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="py-4 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl px-8 py-2 hover:opacity-90 border border-[#22223B] font-medium"
                  onClick={(e) => handleActionClick(e, 'close')}
                >
                  Cancel
                </motion.button>

                {/* <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl px-8 py-2 hover:opacity-90 border border-[#9C0C0C] font-medium text-[#9C0C0C]"
                    onClick={(e) => handleActionClick(e, 'decline')}
                  >
                    Decline
                  </motion.button> */}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl px-8 py-2 hover:opacity-90 bg-[#9C0C0C] font-medium text-white"
                  onClick={(e) => handleActionClick(e, 'accept')}
                >
                  End All Sessions
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EndAllSessions;