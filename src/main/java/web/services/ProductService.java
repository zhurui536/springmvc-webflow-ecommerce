package web.services;

import java.util.List;
import org.springframework.data.domain.Page;
import persistence.models.Product;
import persistence.models.ProductLine;
import persistence.models.Review;
import web.models.product.ProductLineDetail;
import web.models.search.SearchProduct;


/**
 * @author sergio
 */
public interface ProductService {
    List<Product> getNewArrivals();
    List<Product> getNewProducts();
    List<Product> getThreeFeaturedProducts();
    List<Product> getTwoBestsellersProducts();
    List<Review> getApprovedReviews(Long productId);
    Page<Product> search(String query);
    Page<Product> search(SearchProduct searchProduct);
    Page<Product> search(SearchProduct searchProduct, Integer page);
    Page<Product> search(SearchProduct searchProduct, Integer page, String category);
    ProductLineDetail getProductLineDetail(Long id);
    List<ProductLine> getProductLinesDetail(List<Long> ids);
    Page<Product> getByCategory(String slug, Integer page);
    Long getNewFeedbacks();
}
