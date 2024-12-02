/*
  Warnings:

  - You are about to drop the `appointment_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appointments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cancelled_appointments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `design_styles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feddbacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nail_growth_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `preferences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `special_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stylist_assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visit_histories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "appointment_services" DROP CONSTRAINT "appointment_services_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "appointment_services" DROP CONSTRAINT "appointment_services_service_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "cancelled_appointments" DROP CONSTRAINT "cancelled_appointments_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "cancelled_appointments" DROP CONSTRAINT "cancelled_appointments_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "design_styles" DROP CONSTRAINT "design_styles_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "feddbacks" DROP CONSTRAINT "feddbacks_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "nail_growth_histories" DROP CONSTRAINT "nail_growth_histories_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "preferences" DROP CONSTRAINT "preferences_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "special_events" DROP CONSTRAINT "special_events_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "stylist_assignments" DROP CONSTRAINT "stylist_assignments_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "stylist_assignments" DROP CONSTRAINT "stylist_assignments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "visit_histories" DROP CONSTRAINT "visit_histories_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "visit_histories" DROP CONSTRAINT "visit_histories_customer_id_fkey";

-- DropTable
DROP TABLE "appointment_services";

-- DropTable
DROP TABLE "appointments";

-- DropTable
DROP TABLE "cancelled_appointments";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "design_styles";

-- DropTable
DROP TABLE "feddbacks";

-- DropTable
DROP TABLE "nail_growth_histories";

-- DropTable
DROP TABLE "preferences";

-- DropTable
DROP TABLE "special_events";

-- DropTable
DROP TABLE "stylist_assignments";

-- DropTable
DROP TABLE "visit_histories";
