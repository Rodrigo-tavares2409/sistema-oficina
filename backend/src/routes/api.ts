import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// ==========================================
// CLIENTES (Customers)
// ==========================================
router.get('/customers', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({ include: { vehicles: true } });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

router.post('/customers', async (req, res) => {
  try {
    const { name, phone, email, document } = req.body;
    const customer = await prisma.customer.create({
      data: { name, phone, email, document }
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

// ==========================================
// VEÍCULOS (Vehicles)
// ==========================================
router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({ include: { customer: true } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});

router.post('/vehicles', async (req, res) => {
  try {
    const { customer_id, plate, brand, model, year, color } = req.body;
    const vehicle = await prisma.vehicle.create({
      data: { customer_id, plate, brand, model, year, color }
    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar veículo' });
  }
});

// ==========================================
// ORDENS DE SERVIÇO (Kanban)
// ==========================================
router.get('/service-orders', async (req, res) => {
  try {
    const orders = await prisma.serviceOrder.findMany({
      include: {
        vehicle: { include: { customer: true } },
        mechanic: true,
        items: true
      }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ordens de serviço' });
  }
});

router.post('/service-orders', async (req, res) => {
  try {
    const { vehicle_id, description, status } = req.body;
    const order = await prisma.serviceOrder.create({
      data: { vehicle_id, description, status: status || 'WAITING' }
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ordem de serviço' });
  }
});

router.patch('/service-orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await prisma.serviceOrder.update({
      where: { id },
      data: { status }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status da OS' });
  }
});

export default router;
