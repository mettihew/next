
'use client';

import { motion } from 'framer-motion';

export default function Test(){
  return(<div>
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  exit={{ scale: 0 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  ✅ Added to Cart
</motion.div>
  </div>)
}