import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function CustomAboutUs() {
  return (
    <div>
      <PageMeta
        title="Coastella | About us Customization"
        description="About us Customization"
      />
      <PageBreadcrumb pageTitle="About us Customization" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        
        {/* CONTENT HERE */}

      </div>
    </div>
  );
}
