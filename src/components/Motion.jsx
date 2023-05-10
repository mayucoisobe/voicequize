import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const Motion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md bg-black bg-gray-300 shadow">
      <motion.div
        transition={{ layout: { duration: 1, type: 'spring' } }}
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="card"
      >
        <motion.h2 layout="position" className="p-2 text-2xl">
          Framer Motion
        </motion.h2>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              // exit={{ opacity: 0 }}
              className="expand"
            >
              <p className="p-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat labore voluptatem exercitationem et
                tempora, voluptate maxime nisi! Explicabo voluptatum suscipit molestiae cupiditate! Tempore, labore
                accusamus? Placeat suscipit doloribus ducimus dolor.
              </p>
              <p className="p-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, exercitationem!
              </p>
              <button>Hello</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

{
  /* <AnimatePresence exitBeforeEnter>
  {loaded && (
    <motion.div key="content" init={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Content  />
    </motion.div>
  )}
  {!loaded && (
    <motion.div key="spinner" init={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Spinner />
    </motion.div>
  )}
</AnimatePresence> */
}
