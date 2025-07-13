# User Story: Descargar Facturas de Sesiones Anteriores

## Descripción
Como cliente, quiero acceder a un historial de pagos y poder descargar las facturas de cada sesión para mis registros personales o para realizar trámites de reembolso con mi aseguradora.

## Contexto de la Página
Panel del Usuario (Cliente)

## Archivos Afectados
- @src/features/panel-del-usuario-cliente/PaneldelUsuario(Cliente)Page.tsx
- @src/features/panel-del-usuario-cliente/api.ts
- @src/features/panel-del-usuario-cliente/hooks/usePaneldelUsuario(Cliente).ts

## Componentes a Crear
- InvoiceHistory (component)
- InvoiceRow (component)

 los Componentes a crear se deben crear en la carpeta src/features/panel-del-usuario-cliente/components

## Módulos a Importar
- Table from src/components/Table.jsx

## Lógica y Datos
Se necesita un endpoint en 'api.ts' (ej. GET /api/invoices) para obtener el historial de transacciones y otro (ej. GET /api/invoices/:invoiceId/download) que genere y sirva un PDF de la factura. El PDF debe incluir los datos de la empresa, del cliente, y el desglose del servicio.

## Estilos
IMPORTANTE: Revisar el @tailwind.config.js y usar esos colores definidos en la configuración.

## Criterios de Aceptación
1. Hay una sección en mi panel llamada 'Facturación' o 'Historial de Pagos'.
2. Veo una lista de todos mis pagos realizados, con fecha, profesional, servicio y monto.
3. Cada fila de la lista tiene un botón o enlace para 'Descargar Factura'.
4. Al hacer clic en el botón, se descarga un archivo PDF con la factura correspondiente.
5. La factura en PDF contiene toda la información fiscal necesaria.
6. La lista de facturas se puede ordenar por fecha.

## Sugerencias Adicionales
- Permitir filtrar facturas por rango de fechas.
- Enviar la factura automáticamente por correo electrónico después de cada pago.

## Tarea para Editor IA
Crea los componentes 'InvoiceHistory.tsx' y 'InvoiceRow.tsx'. Implementa la lógica para obtener el listado de facturas en el hook y define los endpoints necesarios en 'api.ts', incluyendo el de generación y descarga de PDF.


## RESTRICCIÓN IMPORTANTE
PROHIBIDO TOCAR ARCHIVOS QUE NO SEAN DE LA CARPETA @src/features/panel-del-usuario-cliente
 Cuando termines, escribe: TAREA COMPLETADA.
