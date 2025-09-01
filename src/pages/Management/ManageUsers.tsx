import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function ManageUsers() {
  return (
    <div>
      <PageMeta
        title="Coastella | Manage Users"
        description="Manage Users"
      />
      <PageBreadcrumb pageTitle="Users information" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        
         {/* CONTENT HERE */}

      </div>
    </div>
  );
}
