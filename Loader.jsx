import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader() {
  const [done, setDone] = useState(false);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#fff',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="loader" onAnimationEnd={() => setDone(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
