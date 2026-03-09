import jwt from 'jsonwebtoken';

const demoUsers = [
  { id: 1, email: 'admin@inventory.local', password: 'Admin@123', role: 'Admin', name: 'System Admin' },
  { id: 2, email: 'manager@inventory.local', password: 'Manager@123', role: 'Manager', name: 'Warehouse Manager' },
];

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = demoUsers.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return res.json({ token, user: { id: user.id, role: user.role, name: user.name, email: user.email } });
};
